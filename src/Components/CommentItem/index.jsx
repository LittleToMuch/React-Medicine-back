import React, {Component} from 'react'
import { Comment, List, Popconfirm, message } from 'antd';
import Axios from "axios";

const data = [
    {
        actions: [<span key="comment-list-reply-to-0">Reply to</span>],
        author: 'Han Solo',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: (
            <p>
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure), to help people create their product prototypes beautifully and
                efficiently.
            </p>
        )
    },
    {
        actions: [<span key="comment-list-reply-to-0">Reply to</span>],
        author: 'Han Solo',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: (
            <p>
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure), to help people create their product prototypes beautifully and
                efficiently.
            </p>
        ),
    },
];
// content: "shshshshshs"
// shopId: "2"
// userId: "5dcf522854519282a15be1fa"
// username: "kerwin"
// __v: 0
// _id: "5dcfc074a796b6653256dd24"
export default class CommentItem extends Component {
    state = {
        data:[]
    }
    static getDerivedStateFromProps(props, state) {
        console.log(props)

        let comments = props.comments.map((item, index) => (
            {
                actions: [<span key="comment-list-reply-to-0" ><Popconfirm
                    title="Are you sure?"
                    onConfirm={() => {
                        Axios({
                            method: 'delete',
                            url: '/api/comment/deleteSingle',
                            data: {
                                id: item._id
                            }
                        }).then(res => {
                            if (res.data.deletedCount === 1) {
                                message.success('删除成功');
                                props.deleteHandle(index)
                            }
                        })
                    }}
                    onCancel={(e) => {
                        message.error('取消操作');
                    }}
                    okText="Yes"
                    cancelText="No"
                >删除</Popconfirm></span>],
                author: item.username,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                content: (
                    <p>
                        {item.content}
                    </p>
                ),
            }
        ))
        return {
            data: comments
        }
    }

    // componentDidMount() {
    //         let comments = this.props.comments.map((item, index) => (
    //             {
    //                 actions: [<span key="comment-list-reply-to-0" ><Popconfirm
    //                     title="Are you sure?"
    //                     onConfirm={() => {
    //                         Axios({
    //                             method: 'delete',
    //                             url: '/api/comment/deleteSingle',
    //                             data: {
    //                                 id: item._id
    //                             }
    //                         }).then(res => {
    //                             if (res.data.deletedCount === 1) {
    //                                 message.success('删除成功');
    //
    //                             }
    //                         })
    //                         // setTimeout(()=>{
    //                         //     console.log(state)
    //                         // },0)
    //                     }}
    //                     onCancel={(e) => {
    //                         message.error('取消操作');
    //                     }}
    //                     okText="Yes"
    //                     cancelText="No"
    //                 >delete</Popconfirm></span>],
    //                 author: item.username,
    //                 avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    //                 content: (
    //                     <p>
    //                         {item.content}
    //                     </p>
    //                 ),
    //             }
    //         ))
    //     this.setState({
    //         data: comments
    //     })
    // }
    // confirm = (item, index) => {
    //     Axios({
    //         method: 'delete',
    //         url: '/api/comment/deleteSingle',
    //         data: {
    //             id: item._id
    //         }
    //     }).then(res => {
    //         if (res.data.deletedCount === 1) {
    //             message.success('删除成功');
    //             this.setState({
    //                 data: this.state.data.filter((item, ind) => ind !== index)
    //             })
    //         }
    //     })
    //     // setTimeout(()=>{
    //     //     console.log(state)
    //     // },0)
    // }
    // componentWillReceiveProps(nextProps) {
    //     let comments = nextProps.comments.map((item, index) => (
    //         {
    //             actions: [<span key="comment-list-reply-to-0" ><Popconfirm
    //                 title="Are you sure?"
    //                 onConfirm={this.confirm.bind(this, item.id, index)}
    //                 onCancel={(e) => {
    //                     message.error('取消操作');
    //                 }}
    //                 okText="Yes"
    //                 cancelText="No"
    //             >delete</Popconfirm></span>],
    //             author: item.username,
    //             avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    //             content: (
    //                 <p>
    //                     {item.content}
    //                 </p>
    //             ),
    //         }
    //     ))
    //     this.setState({
    //         data: comments
    //     })
    // }

    render() {
        return (
            <List
                className="comment-list"
                header={`${this.state.data.length} 评论`}
                itemLayout="horizontal"
                dataSource={this.state.data}
                renderItem={item => (
                    <li>
                        <Comment
                            actions={item.actions}
                            author={item.author}
                            avatar={item.avatar}
                            content={item.content}
                        />
                    </li>
                )}
            />
        )
    }
}