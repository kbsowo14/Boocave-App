import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { WebView } from 'react-native-webview'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useRef } from 'react'
import { Dimensions } from 'react-native'

const BG_COLOR = '#171717'

export default function App() {
	const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window')

	// 개발 환경: localhost 또는 로컬 네트워크 IP
	// 프로덕션 환경: 배포된 Boocave-Web URL
	const WEBVIEW_URL = 'http://localhost:3000'
	// const WEBVIEW_URL = 'https://boocave-web.vercel.app/search'

	const webViewRef = useRef<WebView>(null)

	const sendDimensions = () => {
		try {
			const message = JSON.stringify({
				type: 'DEVICE_DIMENSIONS',
				windowWidth: deviceWidth,
				windowHeight: deviceHeight,
			})
			webViewRef.current?.postMessage(message)
		} catch (error) {
			console.error('🔥 Error sending dimensions:', error)
		}
	}

	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.container}>
				<StatusBar style="light" backgroundColor={BG_COLOR} />
				<WebView
					ref={webViewRef}
					source={{ uri: WEBVIEW_URL }}
					originWhitelist={['*']}
					style={styles.webview}
					// 커스텀 User Agent 설정
					userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1"
					// 로딩 인디케이터
					startInLoadingState={true}
					renderLoading={() => (
						<View style={styles.loadingContainer}>
							<ActivityIndicator size="small" color="#51CD42" />
						</View>
					)}
					// JavaScript 활성화
					javaScriptEnabled={true}
					// DOM Storage 활성화 (로컬스토리지 사용 가능)
					domStorageEnabled={true}
					bounces={false}
					// 미디어 재생 허용
					allowsInlineMediaPlayback={true}
					mediaPlaybackRequiresUserAction={false}
					allowsBackForwardNavigationGestures
					thirdPartyCookiesEnabled={true}
					javaScriptCanOpenWindowsAutomatically={true}
					decelerationRate={0.998}
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
					setSupportMultipleWindows={false}
					scalesPageToFit={false}
					mixedContentMode="compatibility"
					onMessage={event => {
						try {
							const data = JSON.parse(event?.nativeEvent?.data)
							if (data?.type === 'LOG') {
								const level = data.data?.level
								const message = data.data?.message
								switch (level) {
									case 'warn':
										console.warn(message)
										break
									case 'error':
										console.error(message)
										break
									default:
										console.log(message)
								}
							}
						} catch (e) {
							console.warn('WebView message error: ', String(e))
						}
					}}
					// 에러 처리
					onError={syntheticEvent => {
						const { nativeEvent } = syntheticEvent || {}
						console.warn('WebView error: ', nativeEvent)
					}}
					// 로드 완료 확인
					onLoadEnd={() => {
						// 로드 완료 시 디바이스 크기 전송
						sendDimensions()
					}}
					webviewDebuggingEnabled={true}
				/>
			</SafeAreaView>
		</SafeAreaProvider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: BG_COLOR,
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
		backgroundColor: BG_COLOR,
	},
})
