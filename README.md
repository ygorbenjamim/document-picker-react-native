# DocumentPicker

Esse projeto simples permite que um arquivo PDF(podendo editar para todos os tipos) seja selecionado do explorador de arquivos do smartphone Android e o seu conteúdo é armazenado em um estado. O método está compatível com qualquer versão do Android e suas API's.

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

Atualmente a lib utilizada possui uma atualização pendente e durante o desenvolvimento, são apresentados warning's que pode ser resolvido nos arquivos da lib até que os proprietários lancem uma atualização no repositório npm.

No diretório [seu projeto]/node_modules/rn-fetch-blob/polyfill
Altere o import do 'RNFetchBlob' nos arquivos Blob.js, Fetch.js, FileReader.js, XMLHttpRequest.js para:

```
// import RNFetchBlob from '../index.js'
import {NativeModules} from 'react-native';
const RNFetchBlob = NativeModules.RNFetchBlob
```
