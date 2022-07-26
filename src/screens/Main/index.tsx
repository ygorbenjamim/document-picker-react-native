import React, { useEffect, useState } from 'react';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { IFileList } from '../../dto/IFileList';


import {
  Container,
  Button,
  Label
} from './styles';

const Main: React.FC = () => {
  // Os arquivos selecionados serão salvos em uma lista em formato de objeto
  const [fileList, setFileList] = useState<IFileList[]>([]);

  // Visualização do estado no console
  useEffect(() => {
    console.log(fileList);
  }, [fileList]);

  // Função para converter o arquivo para base64
  const encodeFile = async () => {
    try {
      if(!fileList) return; // Caso o estado seja undefined, retorne
     
      fileList.forEach(async value => {
        if(!value.uri) return;
        const stat = await RNFetchBlob.fs.stat(value.uri); // Formatando a uri do arquivo por fins de compatibilidade com a plataforma

        RNFetchBlob.fs.readFile(stat.path, 'base64').then(base64 => {
          value.base64 = 'data:application/pdf;base64,' + base64;
        });
      });
        
      // Utilizado para arquivos muito grandes (Problema de base64 mal formatado)
      //let data = '';
      //RNFetchBlob.fs.readStream(stat.path, 'base64').then(ifstream => {
      //  ifstream.open();
      //  ifstream.onData(chunk => {
      //    data += chunk;
      //  });
      //  ifstream.onError(err => {
      //    console.log('oops', err);
      //  });
      //  ifstream.onEnd(() => {
      //    value.base64 = 'data:application/pdf,base64' + data;
      //  });
      //});
      //});
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async () => {
    try {
      // Para alterar para pickMiltiple, remova os colchetes iniciais
      const response = [await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
        copyTo: 'cachesDirectory', // Informando para copiar o arquivo selecionado em cache para evitar problemas de permissões no Android
        mode: 'import',
      })];

      if(!fileList) return;
      response.map(value => {
        const item: IExamFile = {
          name: value.name,
          examType: type,
          size: value.size,
          uri: value.fileCopyUri?.toString(), // Utilizar o fileCopyUri como uri quando o arquivo estiver em cache
          base64: '',
        };

        // Verificação de duplicidade
        const exist = fileList.some(file => file.name === item.name);
        if(!exist) setFileList([...fileList, item]);
        else Alert.alert('Duplicidade de documento', 'Esse mesmo arquivo já foi anexado.');
      });

      encodeFile();

    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // Cancelamento do picker
      } else {
        throw err;
      }
    }
  };

  return(
    <Container>
      <Button onPress={ handleAdd }>
        <Label>Selecionar</Label>
      </Button>
    </Container>
  );
}

export default Main;
