import { TextInput, Button, Group, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { Notification } from '@mantine/core';
import { supabase } from '../../lib/supabase_client';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const form = useForm({
    initialValues: {
      email: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const onLogin = async (values) => {
    console.log(values);
    setLoading(true);
    try {
      await supabase.auth.signIn({
        email: values.email,
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
      <Notification title="Default notification">
        Check your email and click the login link.
      </Notification>
    );
  }

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit(onLogin)}>
        <TextInput
          required
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
        />

        <Group position="right" mt="md">
          <Button type="submit" loading={loading}>
            Submit
          </Button>
        </Group>
      </form>
    </Box>
  );
}
