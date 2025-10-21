import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';


interface FormData {
  nome: string;
  dataNascimento: string;
  senha: string;
  numeroCalcado: string;
  estado: string;
  cidade: string;
}


type FormErrors = {
  [K in keyof FormData]?: string | null;
};


const initialState: FormData = {
  nome: '',
  dataNascimento: '',
  senha: '',
  numeroCalcado: '',
  estado: '',
  cidade: '',
};

const FormularioExemplo: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [modalVisible, setModalVisible] = useState<boolean>(false);


  const handleChange = <K extends keyof FormData>(name: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Limpa o erro ao digitar
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };


  const validate = (): boolean => {
    let newErrors: FormErrors = {};
    let isValid: boolean = true;


    if (!formData.nome.trim()) {
      newErrors.nome = 'O nome é obrigatório.';
      isValid = false;
    }

    const dataRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!formData.dataNascimento) {
      newErrors.dataNascimento = 'A data de nascimento é obrigatória.';
      isValid = false;
    } else if (!dataRegex.test(formData.dataNascimento)) {
      newErrors.dataNascimento = 'Formato inválido (Use DD/MM/AAAA).';
      isValid = false;
    }

    if (!formData.senha) {
      newErrors.senha = 'A senha é obrigatória.';
      isValid = false;
    } else if (formData.senha.length < 6) {
      newErrors.senha = 'A senha deve ter no mínimo 6 caracteres.';
      isValid = false;
    }

    const calcadoNum = parseInt(formData.numeroCalcado, 10);
    if (!formData.numeroCalcado.trim()) {
      newErrors.numeroCalcado = 'O número do calçado é obrigatório.';
      isValid = false;
    } else if (isNaN(calcadoNum) || calcadoNum < 18 || calcadoNum > 50) {
      newErrors.numeroCalcado = 'Número inválido (deve ser entre 18 e 50).';
      isValid = false;
    }

    if (!formData.estado.trim()) {
      newErrors.estado = 'O estado é obrigatório.';
      isValid = false;
    }
    if (!formData.cidade.trim()) {
      newErrors.cidade = 'A cidade é obrigatória.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validate()) {
      setModalVisible(true);
      // Aqui você faria o envio real dos dados para a API
    } else {
      Alert.alert('Erro no Formulário', 'Por favor, corrija os erros nos campos antes de enviar.');
    }
  };

  return (

    <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Questão 07 - Cadastro Pessoal</Text>

      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        value={formData.nome}
        onChangeText={(text) => handleChange('nome', text)}
        autoCapitalize="words"
      />
      {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}

      <Text style={styles.label}>Data de Nascimento:</Text>
      <TextInput
        style={styles.input}
        placeholder="DD/MM/AAAA"
        value={formData.dataNascimento}
        onChangeText={(text) => handleChange('dataNascimento', text)}
        keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
        maxLength={10}
      />
      {errors.dataNascimento && <Text style={styles.errorText}>{errors.dataNascimento}</Text>}

      <Text style={styles.label}>Senha:</Text>
      <TextInput
        style={styles.input}
        placeholder="Senha (mín. 6 caracteres)"
        value={formData.senha}
        onChangeText={(text) => handleChange('senha', text)}
        secureTextEntry={true} // Oculta o texto digitado (requerido)
        autoCapitalize="none"
      />
      {errors.senha && <Text style={styles.errorText}>{errors.senha}</Text>}

      <Text style={styles.label}>Número do Calçado:</Text>
      <TextInput
        style={styles.input}
        placeholder="Apenas números (Ex: 42)"
        value={formData.numeroCalcado}
        onChangeText={(text) => handleChange('numeroCalcado', text.replace(/[^0-9]/g, ''))} 
        keyboardType="numeric" 
        maxLength={2}
      />
      {errors.numeroCalcado && <Text style={styles.errorText}>{errors.numeroCalcado}</Text>}

      <Text style={styles.label}>Estado:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: SP"
        value={formData.estado}
        onChangeText={(text) => handleChange('estado', text)}
        autoCapitalize="characters" // Sugere letras maiúsculas para siglas
      />
      {errors.estado && <Text style={styles.errorText}>{errors.estado}</Text>}

      <Text style={styles.label}>Cidade:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: São Paulo"
        value={formData.cidade}
        onChangeText={(text) => handleChange('cidade', text)}
        autoCapitalize="words"
      />
      {errors.cidade && <Text style={styles.errorText}>{errors.cidade}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar Cadastro</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Dados Cadastrados com Sucesso!</Text>
            {Object.entries(formData).map(([key, value]) => (
              <Text key={key} style={styles.modalText}>
                <Text style={{ fontWeight: 'bold' }}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}:
                </Text>{' '}
                {/* Oculta o valor da senha na exibição */}
                {key === 'senha' ? '********' : value}
              </Text>
            ))}
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(false);
                setFormData(initialState);
                setErrors({});
              }}
            >
              <Text style={styles.textStyle}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 20, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
    fontWeight: '600',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 3,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#12bb02ff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  modalTitle: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E90FF',
    width: '100%',
  },
  modalText: {
    marginBottom: 10,
    textAlign: 'left',
    fontSize: 16,
    color: '#333',
  },
  buttonClose: {
    backgroundColor: '#DC3545', 
    marginTop: 20,
    marginBottom: 0,
    alignSelf: 'stretch',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FormularioExemplo;