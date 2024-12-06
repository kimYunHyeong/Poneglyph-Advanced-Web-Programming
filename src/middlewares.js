import multer from "multer";
import path from "path";
import fs from "fs";

export const localMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Poneglyph";
  res.locals.loggedInUser = req.session.user;
  next();
};

// 저장 경로 및 파일 이름 설정
const uploadDir = path.join(process.cwd(), "src/client/img/user_card_img");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // 디렉토리가 없으면 생성
}

// Multer 저장소 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // 업로드할 디렉토리 설정
  },
  filename: (req, file, cb) => {
    const uniqueName = `user_image_${Date.now()}${path.extname(
      file.originalname
    )}`;
    cb(null, uniqueName); // 고유 파일 이름 생성
  },
});

const upload = multer({ storage });

export default upload; // upload 미들웨어를 export
