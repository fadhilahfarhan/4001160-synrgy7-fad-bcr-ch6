import bcrypt from 'bcryptjs';

class BcryptHelper {
  encryptPassword(password: string) {
    return new Promise<string>((resolve, reject) => {
      bcrypt.hash(password, 10, (err, encryptedPassword) => {
        if (err) reject(err);
        resolve(encryptedPassword);
      });
    });
  }

  checkPassword(encryptedPassword:string, password:string) {
    return new Promise<boolean>((resolve, reject) => {
      bcrypt.compare(password, encryptedPassword, (err, isPassword) => {
        if (err) reject(err);
        resolve(isPassword);
      });
    });
  }
}

const bcryptHelper = new BcryptHelper();
export default bcryptHelper;
