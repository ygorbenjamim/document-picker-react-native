# DocumentPicker

# Permissões

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

diretório: node_modules/rn-fetch-blob/polyfill
Alterar os imports dos arquivos Blob.js, Fetch.js, FileReader.js, XMLHttpRequest.js para:

// import RNFetchBlob from '../index.js'
import {NativeModules} from 'react-native';
const RNFetchBlob = NativeModules.RNFetchBlob
