import jwt, { JwtPayload } from "jsonwebtoken";

interface SignOption {
  expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: "2h",
};

export function signJwtAccessToken(
  payload: JwtPayload,
  options: SignOption = DEFAULT_SIGN_OPTION
) {
  const secret_key = process.env.SECRET_KEY;
  if (!secret_key) throw new Error("SECRET_KEY not defined");
  const token = jwt.sign(payload, secret_key, options);
  return token;
}

export function verifyJwtAccessToken(token: string) {
  try {
    const secret_key = process.env.SECRET_KEY;
    if (!secret_key) throw new Error("SECRET_KEY not defined");
    const decoded = jwt.verify(token, secret_key);
    return decoded as JwtPayload;
  } catch (error) {
    console.log("Access token verification error:", error);
    return null;
  }
}
