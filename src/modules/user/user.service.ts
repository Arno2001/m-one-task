import { Injectable } from '@nestjs/common';
import type { UserRegisterDto } from '../auth/dto/user-register.dto';
import { UserType } from './user.type';
import { db } from '../../database/db';
import { SearchUserDto } from './dto/search-user.dto';
import { GeneratorProvider } from '../../providers';
import { EmailIsExistsException } from './exceptions';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  async createUser(userRegisterDto: UserRegisterDto): Promise<UserType> {
    const { first_name, last_name, age, email, password } = userRegisterDto;

    const isExsist = await this.findByEmail(email);

    if (isExsist) {
      throw new EmailIsExistsException();
    }

    const hashedPassword = GeneratorProvider.generateHash(password);

    const query = await db.query(
      `INSERT INTO users (first_name, last_name, age, email, password) 
        VALUES ($1, $2, $3, $4, $5) 
      RETURNING id, first_name, last_name, age, email`,
      [first_name, last_name, age, email, hashedPassword],
    );
    return query.rows[0];
  }

  async findById(id: string): Promise<UserType> {
    const query = await db.query(
      `SELECT id, first_name, last_name, age, email 
      FROM users WHERE id = $1`,
      [id],
    );
    return query.rows[0];
  }

  async findByEmail(email: string): Promise<UserType> {
    const query = await db.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    return query.rows[0];
  }

  async search(id: string, searchUserDto: SearchUserDto): Promise<UserDto[]> {
    const { first_name, last_name, age } = searchUserDto;

    const query = await db.query(
      `SELECT id, first_name, last_name, age, email FROM users 
      WHERE first_name = $1 AND last_name = $2 AND age = $3 AND id != $4`,
      [first_name, last_name, age, id],
    );
    return query.rows;
  }

  async delete(userId: string): Promise<void> {
    await db.query(`DELETE FROM users WHERE id = $1`, [userId]);
  }
}
