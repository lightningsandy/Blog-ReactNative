import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext';
import {EvilIcons} from '@expo/vector-icons';

const ShowScreen = ({ navigation }) => {
  const { state } = useContext(Context);

  const blogPost = state.find(
    blogPost => blogPost.id === navigation.getParam('id')
  );

  return (
    <View>
      <Text style={styles.showTitle}>{blogPost.title}</Text>
      <Text style={styles.showContent}>{blogPost.content}</Text>
    </View>
  );
};


ShowScreen.navigationOptions = ({navigation}) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Edit', {id: navigation.getParam('id')})}>
        <EvilIcons style={styles.pencilIcon} name="pencil" size={35} />
      </TouchableOpacity>
    ),
  };
}

const styles = StyleSheet.create({
  showTitle:{
    marginBottom: 5,
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft:10
  },
  showContent:{
    fontSize: 30,
    marginTop: 10,
    marginLeft: 10
  },
  pencilIcon:{
    marginRight: 15
  }
});

export default ShowScreen;
