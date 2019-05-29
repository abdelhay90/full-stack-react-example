import {addNewTask, updateTask, removeTask} from "./server";


(async function () {

    await addNewTask({
        name: "My task",
        id: "12345"
    });

    await updateTask({
        name: "My task",
        id: "12345",
        isComplete: false,
        group: 'G1'
    });

    await removeTask("12345");

})();