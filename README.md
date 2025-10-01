# Boocave-App

Boocave-Web을 WebView로 실행하는 Expo React Native 애플리케이션입니다.

이 프로젝트는 Boocave-Web 웹 애플리케이션을 모바일 앱으로 제공하기 위한 WebView 래퍼입니다. React Native와 Expo를 사용하여 iOS 및 Android 플랫폼에서 실행됩니다.

## 기술 스택

- React Native
- Expo
- react-native-webview
- TypeScript

## 1. 설치

```bash
npm install
yarn install
```

## 2. 실행

### 개발 모드

```bash
npm run start
yarn start
```

### Expo-Go 실행

- iOS 시뮬레이터에서 실행: `i` 키 입력
- Android 에뮬레이터에서 실행: `a` 키 입력
- Expo Go 앱으로 실행: QR 코드 스캔

## 3. 설정

### WebView URL 변경

`App.tsx` 파일의 `WEBVIEW_URL` 상수를 수정하여 연결할 웹 애플리케이션 URL을 변경할 수 있습니다.

```typescript
const WEBVIEW_URL = 'http://localhost:3000' // boocave-web 실행 서버 주소
```
