import jwt
import datetime

SECRET_KEY = "@#_122140184_dina_#@"

def generate_jwt(user_id):
    payload = {
        "sub": user_id,
        "iat": datetime.datetime.utcnow(),
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    return token

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Generate JWT token for testing")
    parser.add_argument("user_id", help="User ID to include in the token 'sub' claim")
    args = parser.parse_args()

    token = generate_jwt(args.user_id)
    print("Generated JWT token:")
    print(token)

    print("\nUse this token in Postman or your client by setting the Authorization header:")
    print("Authorization: Bearer <token>")
