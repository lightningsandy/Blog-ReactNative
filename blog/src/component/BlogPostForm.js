import React, {useState} from 'react';
import {Text, View, StyleSheet, TextInput, Button} from 'react-native';


const BlogPostForm = ({ onSubmit, initialValue }) => {


    const [title, setTitle] = useState(initialValue.title);
    const [content, setContent] = useState(initialValue.content);

    return (
        <View>
          <Text style={styles.label}>Enter Title:</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={text => setTitle(text)}
          />
          <Text style={styles.label}>Enter Content:</Text>
          <TextInput
            style={styles.input}
            value={content}
            onChangeText={text => setContent(text)}
          />
          <Button
            title="save Blog Post"
            onPress={() => onSubmit(title, content)}
            //this navigation takes us back to index page after submitting.we can add navigation.navigate here but we are sending it as a call back func bcoz sometimes we might add the 
            //input to db or api calls and it takes some time.. so we send it as callback func and there we run it after api call
          />
        </View>
      );
}


BlogPostForm.defaultProps = {
    initialValue: {
        title: '',
        content: ''
    }
}
// as inital value is not coming from createScreen, it might crash due to undefined, so we create default values


const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 15,
        padding: 5,
        margin: 5
      },
      label: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 5
      }
});


export default BlogPostForm;

