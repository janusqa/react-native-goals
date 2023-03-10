import {
    StyleSheet,
    View,
    TextInput,
    Button,
    Modal,
    Image,
} from 'react-native';
import { useState } from 'react';
import produce from 'immer';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid/non-secure';
import { GoalItemType } from '../App';

interface Props {
    onAddGoal: (item: GoalItemType) => void;
    onShowModal: (show: boolean) => void;
    show: boolean;
}

const GoalInput: React.FC<Props> = (props) => {
    const [enteredGoalText, setEnteredGoalText] = useState<string>('');

    const goalInputHandler = (enteredText: string) => {
        setEnteredGoalText((prevState) => {
            const nextState = produce(prevState, (draft) => {
                draft = enteredText;
                return draft;
            });
            return nextState;
        });
    };

    const handleOnAddGoal = () => {
        if (enteredGoalText.trim().length !== 0) {
            props.onAddGoal({ id: nanoid(), text: enteredGoalText });

            setEnteredGoalText((prevState) => {
                const nextState = produce(prevState, (draft) => {
                    draft = '';
                    return draft;
                });
                return nextState;
            });

            props.onShowModal(false);
        }
    };

    return (
        <Modal visible={props.show} animationType="slide">
            <View style={styles.inputContainer}>
                <Image
                    style={styles.image}
                    source={require('../assets/images/goal.png')}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Your course goal!"
                    onChangeText={goalInputHandler}
                    value={enteredGoalText}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button
                            title="Cancel"
                            onPress={() => props.onShowModal(false)}
                            color="#f31282"
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            title="Add Goal"
                            onPress={handleOnAddGoal}
                            color="#b180f0"
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#311b6b',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#e4d0ff',
        backgroundColor: '#e4d0ff',
        color: '#120438',
        borderRadius: 6,
        width: '100%',
        padding: 16,
    },
    buttonContainer: {
        marginTop: 16,
        flexDirection: 'row',
    },
    button: {
        width: 100,
        marginHorizontal: 8,
    },
    image: {
        width: 100,
        height: 100,
        margin: 20,
    },
});

export default GoalInput;
