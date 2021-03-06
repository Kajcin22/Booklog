import { TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { Notification } from '@mantine/core';
import { supabase } from '../../lib/supabase_client';
import styles from './Login.module.css';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const form = useForm({
    initialValues: {
      email: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Neplatný e-mail'),
    },
  });

  const onLogin = async (values) => {
    setLoading(true);
    try {
      await supabase?.auth?.signIn({
        email: values?.email,
      });
      setLoading(false);
      setSuccess(true);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Notification title="Magic link odeslán!">
        Mrkni se do e-mailu a klikni na potvrzovací link. Raději si zkontroluj i
        hromadné zprávy nebo spam.
      </Notification>
    );
  }

  return (
    <>
      <div className={styles.registrace}>
        <form onSubmit={form?.onSubmit(onLogin)}>
          <div className={styles.registrace}>
            <div className={styles.registrace__input}>
              <TextInput
                required
                label="Zadej e-mail:"
                placeholder="muj@mail.com"
                rightSection={
                  <div onClick={() => form?.setFieldValue('email', '')}>X</div>
                }
                {...form?.getInputProps('email')}
              />
            </div>
            <div className={styles.registrace__button}>
              <Button type="submit" loading={loading}>
                Přihlásit se
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
