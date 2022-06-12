import { Button, Group, Box } from '@mantine/core';
import { useState } from 'react';
import { Notification } from '@mantine/core';
import { supabase } from '../../lib/supabase_client';
import { useRouter } from 'next/router';

export default function Logout() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const onLogout = async () => {
    setLoading(true);
    try {
      await supabase?.auth?.signOut();
      setLoading(false);
      setSuccess(true);
      router.push('/');
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Notification title="Odhlášení proběhlo v pořádku.">
        Byli jste odhlášeni.
      </Notification>
    );
  }

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={() => onLogout()}>
        <Group position="right" mt="md">
          <Button type="submit" loading={loading}>
            Odhlásit se
          </Button>
        </Group>
      </form>
    </Box>
  );
}
