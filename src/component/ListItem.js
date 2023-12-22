import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import Placeholder from "react-bootstrap/Placeholder";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom"
import axios from 'axios';
import { format } from 'date-fns';



function ListItem(props) {
  
  //To handle the delete button click
  const handleDelete = () => {
    //Ask for confirmation before delete
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      //If confirmed, send a DELETE request to the server
      axios.delete("http://localhost:4000/addlist/" + props.myList._id)
        .then((res) => {
          // Wait for the delete operation to complete, then trigger the reload
          props.reload();
        })
        .catch((error) => {
          console.error("Delete failed", error);
        });
    }
  };

  //Format datetime for display
  const formattedDatetime = format(new Date(props.myList.datetime), 'yyyy-MM-dd HH:mm:ss');
  return (
    <div className="d-flex flex-wrap justify-content-around">
      <div>
        {/* Display each TO-DO list as card */}
        <Card style={{ width: '75rem', marginBottom: '20px' }}>
          <Card.Body>
            <Card.Title style={{ fontSize: '48px' }}>{props.myList.title}</Card.Title>
            <Card.Text style={{ fontSize: '16px' }}><p>Description:</p>{props.myList.description}</Card.Text>
            <Card.Text style={{ fontSize: '16px' }}><p>Due Date:</p>{formattedDatetime}</Card.Text>
            {/* Link to the Update page */}
            <Link to={"/update/"+props.myList._id}>      
              <FontAwesomeIcon icon={faEdit} style={{marginRight: '10px'}} color='black'/>            
            {/* Delete Button */}
            </Link>
              <FontAwesomeIcon icon={faTrash} style={{marginLeft: '10px'}} onClick={handleDelete}/>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default ListItem;
