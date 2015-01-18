var React = require('react');

module.exports = React.createClass({

    getInitialState: function() {
        return {
            data: this.props.data || [],
            name: this.props.name || null
        }
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
                </tr>
            </thead>
            <tbody>
                {this.state.data.map(function(row, index) {
                    return <tr key={index}>
                        {columns.map(function(column, index) {
                            return <td key={index}>{row[column]}</td>
                        })}
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
