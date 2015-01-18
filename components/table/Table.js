var React = require('react');

module.exports = React.createClass({

    getInitialState: function() {
        var hasId = this.props.data.every(function(item) {
            return item['id'] !== null;
        });

        if (!hasId) {
            console.error("An admin table must supply id's for each row.");
        }

        return {
            data: this.props.data || [],
            name: this.props.name || null
        }
    },

    componentDidMount: function() {
    },

    render: function() {
        var columns = this.generateColumns(this.state.data);
        var rows = this.generateRows(columns);

        return <table>
            <caption>{this.state.name}</caption>
            <thead>
                <tr>
                    {columns.map(function(column) {
                        return <th key={column}>{column}</th>
                    })}
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {this.state.data.map(function(row, index) {
                    return <tr key={index}>
                        {columns.map(function(column, index) {
                            return <td key={index}>{row[column]}</td>
                        })}
                        <td>View / Edit / Delete</td>
                    </tr>
                })}
            </tbody>
        </table>
    },

    generateColumns: function(data) {
        var columns = Object.keys(data[0]);
        return columns;
    },

    generateRows: function(columns) {
        
    }
});
