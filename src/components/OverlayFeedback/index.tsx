import { BlurMask, Canvas, Rect } from '@shopify/react-native-skia'
import { useEffect } from 'react'
import { useWindowDimensions } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

import { THEME } from '../../styles/theme'

const STATUS = [
  'transparent',
  THEME.COLORS.BRAND_LIGHT,
  THEME.COLORS.DANGER_LIGHT,
]

interface OverlayFeedbackProps {
  status: number
}

export function OverlayFeedback({ status }: OverlayFeedbackProps) {
  const color = STATUS[status]

  const opacity = useSharedValue(0)

  const { height, width } = useWindowDimensions()

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  useEffect(() => {
    opacity.value = withSequence(
      withTiming(1, { duration: 400, easing: Easing.bounce }),
      withTiming(0),
    )
  }, [status])

  return (
    <Animated.View
      style={[{ height, width, position: 'absolute' }, animatedStyle]}
    >
      <Canvas style={{ flex: 1 }}>
        <Rect x={0} y={0} height={height} width={width} color={color}>
          <BlurMask blur={50} style="inner" />
        </Rect>
      </Canvas>
    </Animated.View>
  )
}
