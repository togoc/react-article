import React from 'react'
import { Input, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words';
import { connect } from 'react-redux'
import * as Actions from '../../store/actions/people'
import PeopleTable from './PeopleTable'
import { Link } from 'react-router-dom'
import  './css/people.css'
class App extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
  };
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };
  componentDidMount(){
    this.props.getPeopleList()
  }
  render() {
    const { people } = this.props
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: '30%',
        ...this.getColumnSearchProps('name'),
      },
      {
        title: '朝代',
        dataIndex: 'age',
        key: 'age',
        width: '20%',
        ...this.getColumnSearchProps('age'),
      },
      {
        title: '作品',
        render:(text, record)=>{
          return (
            <div className='people'>
                {
                  people.length<2?<div>loading</div>:
                  record.content.map((item,index)=>{
                   return <Link className='people-item' key={item._id} to={'/home/news/'+item._id+'?people'}>
                     {item.title}</Link>
                  })
                }
            </div>
          )
       },
      },
    ];
    return (
      <>
      {
        people.length<2?<div>loading</div>
        :<PeopleTable columns={columns} dataSource={people} />
      }
      </>
    )
  }
}
const mapState = (state) => {
  return {
    people:state.peopleList
  }
}
export default connect(mapState,{...Actions})(App)