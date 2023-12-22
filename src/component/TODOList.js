import ListItem from "./ListItem"

function TODOList(props){
     // Mapping through the list of TODO items and rendering each as a ListItem component
    return props.myLists.map(
        (list) => {
            return <ListItem myList = {list} key={list._id} reload={()=>{props.Reload()}}></ListItem>
        }
    )
}

export default TODOList;