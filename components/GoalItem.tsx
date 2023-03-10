import { StyleSheet, View, Text, Pressable } from 'react-native';
import { GoalItemType } from '../App';

type Props = {
    item: GoalItemType;
    onDeleteGoal: (id: string) => void;
};

const GoalItem: React.FC<Props> = (props) => {
    return (
        <View style={styles.goalItem}>
            <Pressable
                onPress={() => props.onDeleteGoal(props.item.id)}
                android_ripple={{ color: '#210644' }} // for android
                style={({ pressed }) => pressed && styles.pressedItem} // for ios and android
            >
                <Text style={styles.goalText}>{props.item.text}</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    goalItem: {
        margin: 8,
        borderRadius: 6,
        backgroundColor: '#5e0acc',
    },
    goalText: {
        color: 'white',
        padding: 8,
    },
    pressedItem: {
        opacity: 0.5,
    },
});

export default GoalItem;
