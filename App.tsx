import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { WebView } from 'react-native-webview'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

export default function App() {
	// 개발 환경: localhost 또는 로컬 네트워크 IP
	// 프로덕션 환경: 배포된 Boocave-Web URL
	// const WEBVIEW_URL = __DEV__
	//   ? 'http://localhost:3000'  // Next.js 개발 서버 기본 포트
	//   : 'https://your-production-url.com';  // 나중에 실제 배포 URL로 변경
	const WEBVIEW_URL = 'https://naver.com'

	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.container}>
				<StatusBar style="auto" />
				<WebView
					source={{ uri: WEBVIEW_URL }}
					style={styles.webview}
					// 로딩 인디케이터
					startInLoadingState={true}
					renderLoading={() => (
						<View style={styles.loadingContainer}>
							<ActivityIndicator size="large" color="#0000ff" />
						</View>
					)}
					// JavaScript 활성화
					javaScriptEnabled={true}
					// DOM Storage 활성화 (로컬스토리지 사용 가능)
					domStorageEnabled={true}
					// 미디어 재생 허용
					allowsInlineMediaPlayback={true}
					mediaPlaybackRequiresUserAction={false}
					// 에러 처리
					onError={syntheticEvent => {
						const { nativeEvent } = syntheticEvent
						console.warn('WebView error: ', nativeEvent)
					}}
					// 로드 완료 확인
					onLoadEnd={() => {
						console.log('WebView loaded successfully')
					}}
				/>
			</SafeAreaView>
		</SafeAreaProvider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	webview: {
		flex: 1,
	},
	loadingContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
})
