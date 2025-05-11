import { FormEvent, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
// import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import ButtonComponent from '../../../../components/button/ButtonComponent';
import {
  useCreateUser,
  useSendOTPMail,
} from '../../../../services/auth/auth.data';
import { OTP_SRC } from '@/helpers/types';
import { useNavigate } from 'react-router-dom';
import { notificationProperties } from '@/utils/constants';

interface OTPComponentProps {
  setEmailProp?: React.Dispatch<React.SetStateAction<string>>;
  user?: { name: string; email: string; password: string };
  type: OTP_SRC;
  emailProp?: string;
}

const OTPComponent = ({
  setEmailProp,
  user,
  type,
  emailProp,
}: OTPComponentProps) => {
  const [email, setEmail] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [OTP, setOTP] = useState<string | null>(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const { mutateAsync: createUser } = useCreateUser();
  const navigate = useNavigate();
  // const { theme } = useSelector((state) => state.theme);

  const notifyError = (error: string) =>
    toast.error(error, notificationProperties);
  const notifySuccess = (msg: string) =>
    toast.success(msg, notificationProperties);

  const { otp, isSuccess, refetch } = useSendOTPMail({ type, email });

  useEffect(() => {
    if ((email && navigator.onLine) || !isSuccess || !OTP?.length)
      setButtonDisabled(false);
    else setButtonDisabled(true);
  }, [email, isSuccess]);

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem('otp', JSON.stringify(otp));
      notifySuccess(`OTP sent on ${email}`);
    }
  }, [isSuccess, otp]);

  useEffect(() => {
    if (type === OTP_SRC.SIGN_UP && emailProp) {
      setEmail(emailProp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const confirmOTP = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (localStorage.getItem('otp') == OTP) {
      if (type === OTP_SRC.FORGOT_PASSWORD && setEmailProp) {
        localStorage.clear();
        setEmailProp(email);
      } else if (user) {
        try {
          await createUser({ user });
          notifySuccess('Email Verified');
          navigate('/home');
        } catch (error: any) {
          notifyError(error.message);
        }
      }
    } else notifyError('Wrong OTP entered.');
  };

  const sendOTPMail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmail(emailInput);
  };

  return (
    <>
      {isSuccess || type === OTP_SRC.SIGN_UP ? (
        <Form onSubmit={confirmOTP}>
          <Form.Group className='mb-3'>
            <Form.Label className={'tm-font-secondary fw-medium'}>
              Enter OTP
            </Form.Label>
            <Form.Control
              type={'number'}
              placeholder={'Enter OTP'}
              onChange={(e) => setOTP(e.target.value)}
              // className={`${theme === 'DARK' && 'form-control-dark'}`}
            />
            <u
              style={{
                fontSize: '0.9rem',
                paddingTop: '0.4rem',
                cursor: 'pointer',
              }}
              onClick={() => refetch()}
            >
              Resend OTP
            </u>
          </Form.Group>
          <div className='d-grid gap-2'>
            <ButtonComponent
              variant={'dark'}
              name={'Confirm OTP'}
              disabled={buttonDisabled}
              type={'submit'}
            />
          </div>
        </Form>
      ) : (
        <Form onSubmit={sendOTPMail}>
          <Form.Group className='mb-3'>
            <Form.Label className={'tm-font-secondary fw-medium'}>
              {'Enter Email address'}
            </Form.Label>
            <Form.Control
              type={'email'}
              placeholder={'name@example.com'}
              onChange={(e) => setEmailInput(e.target.value)}
              // className={`${theme === 'DARK' && 'form-control-dark'}`}
            />
          </Form.Group>
          <div className='d-grid gap-2'>
            <ButtonComponent
              variant={'dark'}
              name={'Reset Password'}
              disabled={buttonDisabled}
              type={'submit'}
            />
          </div>
        </Form>
      )}
      <ToastContainer />
    </>
  );
};

export default OTPComponent;
