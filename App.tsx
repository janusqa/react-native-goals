import { StyleSheet, View, Button, TextInput, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import produce from 'immer';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export type GoalItemType = {
    id: string;
    text: string;
};

const App = () => {
    const [courseGoals, setCourseGoals] = useState<GoalItemType[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);

    const addGoalHandler = (item: GoalItemType) => {
        setCourseGoals((prevState) => {
            const nextState = produce(prevState, (draft) => {
                draft.push(item);
            });
            return nextState;
        });
    };

    const deleteGoalHandler = (id: string) => {
        setCourseGoals((prevState) => {
            const nextState = produce(prevState, (draft) => {
                draft = draft.filter((item) => item.id !== id);
                return draft;
            });
            return nextState;
        });
    };

    const showAddGoalHandler = (show: boolean) => {
        setShowModal((prevState) => {
            const nextState = produce(prevState, (draft) => {
                draft = show;
                return draft;
            });
            return nextState;
        });
    };

    return (
        <>
            <StatusBar style="light" />
            <View style={styles.appContainer}>
                <Button
                    title="Add New Goal"
                    color="#a065ec"
                    onPress={() => showAddGoalHandler(true)}
                />
                <GoalInput
                    show={showModal}
                    onAddGoal={addGoalHandler}
                    onShowModal={showAddGoalHandler}
                />
                <View style={styles.goalsContainer}>
                    <FlatList
                        data={courseGoals}
                        renderItem={(goalData) => (
                            <GoalItem
                                onDeleteGoal={deleteGoalHandler}
                                item={goalData.item}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 16,
        backgroundColor: '#1e0858',
    },
    goalsContainer: { flex: 5 },
});

export default App;
