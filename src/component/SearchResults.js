import React from "react";
import Card from "react-bootstrap/Card";
import { format } from "date-fns";

function SearchResults({ searchResults }) {
    return (
        <div>
            {/* Mapping through searchResults and rendering each result as a Card */}
            {searchResults.map((result) => (
                <Card key={result.id} style={{ width: '75rem', marginBottom: '20px' }}>
                    <Card.Body>
                        {/* Displaying title */}
                        <Card.Title style={{ fontSize: '48px' }}>{result.title}</Card.Title>
                        {/* Displaying description */}
                        <Card.Text style={{ fontSize: '16px' }}>{result.description}</Card.Text>
                        {/* Assuming 'datetime' is a property of 'result' */}
                        <Card.Text style={{ fontSize: '16px' }}>{format(new Date(result.datetime), 'yyyy-MM-dd HH:mm:ss')}</Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}

export default SearchResults;
