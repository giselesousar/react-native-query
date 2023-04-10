import React from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from 'react-query';

import {useFakeApi} from '../../context';

export default function AddPost() {
  const {addPost} = useFakeApi();

  const {mutate, isLoading} = useMutation(
    async (values: {title: string; body: string}) => addPost(values),
  );

  const queryClient = useQueryClient();

  const navigation = useNavigation();

  const {control, handleSubmit} = useForm({
    defaultValues: {
      title: '',
      body: '',
    },
  });

  function onSubmit(form: {title: string; body: string}) {
    mutate(form, {
      onSuccess: () => {
        Alert.alert('Success');
        queryClient.invalidateQueries(['posts']);
        navigation.goBack();
      },
    });
  }

  return (
    <View style={styles.container}>
      <Controller
        name="title"
        control={control}
        render={({field: {value, onChange}}) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            style={styles.input}
            placeholder="title"
          />
        )}
      />

      <Controller
        name="body"
        control={control}
        render={({field: {value, onChange}}) => (
          <TextInput
            style={styles.input}
            placeholder="body"
            multiline
            numberOfLines={8}
            textAlignVertical="top"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
        {isLoading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <Text style={styles.buttonText}>Add</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: 'blue',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
  },
});
