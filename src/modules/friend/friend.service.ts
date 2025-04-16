import { Injectable } from '@nestjs/common';
import { db } from '../../database/db';
import { FriendStatusTypeEnum } from '../../constants/friend-status-type.enum';
import { UserDto } from '../user/dto/user.dto';
import { FriendRequestDto } from './dto/friend-request.dto';
import { FriendRequestExistsException } from './exceptions';

@Injectable()
export class FriendService {
  async getAll(id: string): Promise<UserDto[]> {
    const query = await db.query(
      `SELECT 
        u.id,
        u.first_name,
        u.last_name,
        u.email,
        u.age,
        u.created_at
      FROM friends f
      JOIN users u
        ON (u.id = f.user1_id AND f.user2_id = $1)
        OR (u.id = f.user2_id AND f.user1_id = $1);`,
      [id],
    );
    return query.rows;
  }

  async getAllRequests(id: string): Promise<FriendRequestDto[]> {
    const query = await db.query(
      `SELECT 
        fr.id, 
        sent_at, 
        status, 
        json_build_object(
          'id', u.id,
          'first_name', u.first_name,
          'last_name', u.last_name,
          'age', u.age,
          'email', u.email
        ) AS sender
      FROM friend_requests fr
        JOIN users u ON fr.receiver_id = u.id
      WHERE receiver_id = $1`,
      [id],
    );
    return query.rows;
  }

  async sendRequest(
    receiver_id: string,
    sender_id: string,
  ): Promise<FriendRequestDto> {
    const isExsist = await db.query(
      `SELECT * FROM friend_requests 
      WHERE receiver_id = $1 AND sender_id = $2`,
      [receiver_id, sender_id],
    );

    if (isExsist.rows[0]) {
      throw new FriendRequestExistsException();
    }

    const query = await db.query(
      `INSERT INTO friend_requests(receiver_id, sender_id, status)
      VALUES($1, $2, $3) RETURNING *`,
      [receiver_id, sender_id, FriendStatusTypeEnum.PENDING],
    );

    return query.rows[0];
  }

  async updateStatus(
    id: string,
    status: FriendStatusTypeEnum,
  ): Promise<FriendRequestDto> {
    const query = await db.query(
      `UPDATE friend_requests 
        SET status = $1
      WHERE id = $2
      RETURNING *
      `,
      [status, id],
    );

    if (status === FriendStatusTypeEnum.ACCEPT) {
      await db.query(
        `INSERT INTO friends(user1_id, user2_id)
         VALUES($1, $2)`,
        [query.rows[0].receiver_id, query.rows[0].sender_id],
      );
    }
    await db.query(`DELETE FROM friend_requests WHERE id = $1`, [
      query.rows[0].id,
    ]);

    return query.rows[0];
  }
}
