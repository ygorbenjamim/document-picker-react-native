# DocumentPicker

# Permissões

No diretório [seu projeto]/Android/app/src/main edite o arquivo AndroidManifest.xml e adicione as seguintes linhas:

```
<manifest>
  <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
  <application
    android:requestLegacyExternalStorage="true"
  </application>
</manifest>
```

# Evitar warning

No diretório [seu projeto]/node_modules/rn-fetch-blob/polyfill
Altere o import do 'RNFetchBlob' nos arquivos Blob.js, Fetch.js, FileReader.js, XMLHttpRequest.js para:

```
// import RNFetchBlob from '../index.js'
import {NativeModules} from 'react-native';
const RNFetchBlob = NativeModules.RNFetchBlob
```
