import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import AdminNavbar from './AdminNavbar';
import axios from 'axios';

function Blockchain() {
    const [blocks, setBlocks] = useState([]);

    useEffect(() => {
        const fetchBlocks = async () => {
            try {
                const response = await axios.get('http://localhost:6900/api/products/all');
                const blockchainData = response.data.map(product => ({
                    emailHash: product.emailHash,
                    nameHash: product.nameHash,
                    cityHash: product.cityHash,
                    vegetableNameHash: product.vegetableNameHash,
                    categoryHash: product.categoryHash,
                    priceHash: product.priceHash,
                    descriptionHash: product.descriptionHash,
                    vegetableImageHash: product.vegetableImageHash // Assuming this is the hash for image
                }));
                setBlocks(blockchainData);
            } catch (error) {
                console.error('Error fetching blockchain data:', error);
            }
        };

        fetchBlocks();
    }, []);

    return (
        <div style={styles.pageContainer}>
            <AdminNavbar />
            <div style={styles.tableContainer}>
                <h1><strong>BLOCKCHAIN BLOCKS</strong></h1>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>BLOCK 1</th>
                            <th>BLOCK 2</th>
                            <th>BLOCK 3</th>
                            <th>BLOCK 4</th>
                            <th>BLOCK 5</th>
                            <th>BLOCK 6</th>
                            <th>BLOCK 7</th>
                            <th>BLOCK 8</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blocks.map((block, index) => (
                            <tr key={index}>
                                <td>{block.emailHash}</td>
                                <td>{block.nameHash}</td>
                                <td>{block.cityHash}</td>
                                <td>{block.vegetableNameHash}</td>
                                <td>{block.categoryHash}</td>
                                <td>{block.priceHash}</td>
                                <td>{block.descriptionHash}</td>
                                <td>{block.vegetableImageHash}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

const styles = {
    pageContainer: {
        padding: '20px',
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
        overflowX: 'auto' // Ensures horizontal scrollbar is available if needed
    },
    tableContainer: {
        overflowX: 'auto', // Allows horizontal scrolling
        marginTop: '20px',
        borderRadius: '8px'
    }
};

export default Blockchain;
