import React from 'react';
import LottieView from 'lottie-react-native';

interface LottieProps {
    source: any;
}

function LottieAnimation(prop: LottieProps): JSX.Element {

  return <LottieView source={prop.source} autoPlay loop />;
}

export default React.memo(LottieAnimation);