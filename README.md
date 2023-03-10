$ npx create-expo-app .
$ touch tsconfig.json
$ npx expo start


$ ~/hd2/applications/android-sdk/emulator/emulator -list-avds
$ ~/hd2/applications/android-sdk/emulator/emulator -avd Pixel_5_API_33_ReactNative_Expo

# nanoid
$ npm i nanoid react-native-get-random-values
$ npm i -D @types/react-native-get-random-values
import 'react-native-get-random-values';
import { nanoid } from 'nanoid/non-secure';