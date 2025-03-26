import axios from 'axios';
import { useState } from 'react';
import { PlainUserModel } from '@/models/user.model';

type UseDetailedUserProvider = {
  user: PlainUserModel | null;
  load: (userId: string) => void;
};

export const useDetailedUser = (): UseDetailedUserProvider => {
  const [user, setUser] = useState<PlainUserModel | null>(null);

  const load = (userId: string): void => {
    console.log(userId);
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`)
      .then((data) => setUser(data.data))
      .catch((err) => console.error(err));
  };
  return { user, load };
};

type DetailedUserProviders = {
  useDetailedUser: () => UseDetailedUserProvider;
};

export const useDetailedUserProviders = (): DetailedUserProviders => ({
  useDetailedUser,
});
