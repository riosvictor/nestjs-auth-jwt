export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

type Props = {
  id: string;
  name: string;
  email: string;
  password: string;
  roles?: Role[];
};

export class UserEntity {
  id: string;
  name: string;
  email: string;
  password: string;
  roles?: Role[] = [];

  private constructor(props: Props) {
    // @This used for ORM purposes
    if (!props) {
      return;
    }

    this.id = props.id || null;
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.roles = props.roles || [Role.USER];
  }

  static create(props: Props): UserEntity {
    return new UserEntity(props);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      roles: this.roles,
    };
  }
}
