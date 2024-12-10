import multer from "multer";
import { S3Client } from "@aws-sdk/client-s3";
import multerS3 from "multer-s3";

const s3Client = new S3Client({
  region: "ap-northeast-1",
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const s3UserOwnCardStorage = multerS3({
  s3: s3Client,
  bucket: "poneglyph-advanced-web-programming",
  acl: "public-read",
  key: function (req, file, cb) {
    cb(null, `usercards/${Date.now().toString()}`);
  },
});

export const localMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Poneglyph";
  res.locals.loggedInUser = req.session.user;
  next();
};

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    return res.status(401).redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/");
  }
};

// Multer 저장소 설정
export const imgUpload = multer({
  limits: {
    fileSize: 3000000,
  },
  storage: s3UserOwnCardStorage,
});
