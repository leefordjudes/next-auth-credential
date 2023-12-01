'use server';
import { hash } from 'bcrypt';
import { db } from '@/db';

interface RegisterInput {
  email: string;
  password: string;
}
interface RegisterResponse {
  userId: number;
  email: string;
}

export async function register(input: RegisterInput) {
  try {
    console.log('register input: ', input);
    let hashedPassword = await hash(input.password, 10);
    let data = { email: input.email, password: hashedPassword };
    console.log('register user: ', data);
    let user = await db.user.create({ data });
    console.log('response: ', user);
    let resp: RegisterResponse = {
      userId: user.id,
      email: user.email,
    };
    return resp;
  } catch (e) {
    console.log('err: ', e);
  }
}
