import { useMutation } from "@tanstack/react-query";
import { ADAPTER_STATUS } from "@web3auth/base";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";

import Button from "src/components/common/button";
import Input from "src/components/common/input";
import VerificationInputComponent from "src/components/common/verification-input";
import { useWeb3AuthContext } from "src/context/web3-auth-context";
import { AuthService } from "src/controller/AuthAPI.service";
import { EmailSteps } from "src/interfaces/global";
import { handleRequestAuth0JWT, handleOTP, checkWeb3AuthInstance, parseToken } from "src/lib/helpers";

import OTPInputWrapper from "../../otp-input-wrapper";

interface LoginEmailProps {}

const LoginEmail: React.FC<LoginEmailProps> = () => {
  const router = useRouter();
  const { isLoggingIn, init, setIsLoggingIn, web3authSfa, setIsLoggedIn, setJWT } = useWeb3AuthContext();

  const [emailRegisterStep, setEmailRegisterStep] = useState<EmailSteps>(EmailSteps.STEP_1);
  const [verificationCodeLoading, setVerificationCodeLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [confirmationLoading, setConfirmationLoading] = useState(false);
  const {
    handleSubmit,
    register,
    control,
    getValues,
    formState: { errors },
  } = useForm<{ email: string }>();


    // ✅ do not push, TEMP: Skip login entirely
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SKIP_LOGIN === "true") {
      setJWT("dev-jwt-token");
      setIsLoggedIn(true);
      router.push("/dashboard");
    }
  }, []);

  const handleObtainJWTToken = useMutation({
    mutationFn: (web3authToken: string) => AuthService.loginUser({ web3authToken }),
  });

  const handleSubmitForm = async (data: { email: string }) => {
    setVerificationCodeLoading(true);
    await handleOTP(data.email, () => setEmailRegisterStep(EmailSteps.STEP_2));
    setVerificationCodeLoading(false);
  };

  const handleConfirm = async (OTPcode: string) => {
    setConfirmationLoading(true);
    await handleRequestAuth0JWT(getValues("email"), OTPcode as string, handleAccount);
    setConfirmationLoading(false);
  };

  const handleAccount = async (auth0Jwt: string) => {
    await init();
    // trying logging in with the Single Factor Auth SDK
    try {
      checkWeb3AuthInstance(web3authSfa);

      setIsLoggingIn(true);

      const { email } = parseToken(auth0Jwt);

      const subVerifierInfoArray = [
        {
          verifier: "auth0-passwordless",
          idToken: auth0Jwt!,
        },
      ];

      await web3authSfa.connect({
        verifier: "trumarket-w3a-auth0-2",
        verifierId: email,
        idToken: auth0Jwt,
        subVerifierInfoArray,
      });

      const jwt = await web3authSfa.authenticateUser();

      const user = await handleObtainJWTToken.mutateAsync(jwt.idToken);
      setJWT(user.token);

      setIsLoggedIn(true);

      // if (web3authSfa.status === ADAPTER_STATUS.CONNECTED) {
      //     window.location.href = "/dashboard";
      // } // Uncomment and push, logic for login

      if (process.env.NEXT_PUBLIC_SKIP_LOGIN === "true") {
             window.location.href = "/dashboard";
              return;
          } // do not push, Logic for skipping login


    } catch (err) {
      // Single Factor Auth SDK throws an error if the user has already enabled MFA
      // One can use the Web3AuthNoModal SDK to handle this case
      console.error(err);
      toast.error("Account doesn't exists! Please register");
    } finally {
      setIsLoggingIn(false);
      setConfirmationLoading(false);
    }
  };

  return (
    <>
      {emailRegisterStep === EmailSteps.STEP_1 ? (
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <p className="mb-[5px] text-[13px] leading-[1.2em] tracking-normal text-[#00000099]">Email address</p>
          <Input
            name="email"
            placeholder="Please provide email"
            register={register("email", {
              required: "Email field is required!",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Email format is invalid!",
              },
            })}
            hasError={Boolean(errors.email)}
            errorMessageClass="!relative !left-0"
            errors={errors}
          />
          <div className="mt-[10px]">
            <Button disabled={verificationCodeLoading} loading={verificationCodeLoading}>
              <p>Send me an email with code</p>
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col items-center gap-[14px]">
          <OTPInputWrapper
            email={getValues("email")}
            setVerificationCode={setVerificationCode}
            handleConfirm={handleConfirm}
            resend={() => handleSubmitForm({ email: getValues("email") })}
            resendLoading={verificationCodeLoading}
            setEmailRegisterStep={setEmailRegisterStep}
          />
          <div className="mt-[11px] w-full">
            <Button
              onClick={() => handleConfirm(verificationCode)}
              loading={isLoggingIn || confirmationLoading}
              disabled={verificationCode?.length !== 6 || isLoggingIn || confirmationLoading}
            >
              <p>Confirm</p>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginEmail;
