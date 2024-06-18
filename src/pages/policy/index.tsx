import React from 'react';
import { Button, Form, Input, Space, Row, Col, theme, Typography } from 'antd';
import axios from 'axios';

interface PolicyProps {
    onClick: (values: any) => void;
}

const Policy: React.FC<PolicyProps> = ({ onClick }) => {
    const { token } = theme.useToken();
    const [form] = Form.useForm();

    const formStyle: React.CSSProperties = {
        maxWidth: '1200px',
        minWidth: '1000px', // 设置最小宽度
        minHeight: '500px', // 设置最小高度
        width: '100%', // 确保表单宽度占满容器
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 24,
        display: 'flex', // 使表单内容撑开
        flexDirection: 'column', // 垂直排列内容
        justifyContent: 'space-between', // 让内容均匀分布
    };

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center', // 水平方向居中
        minHeight: '600px', // 最小高度设为视口高度
        padding: '10px', // 增加内边距，使内容居中且不贴边
        marginTop: '200px'
    };

    const formItemStyle: React.CSSProperties = {
        marginBottom: 25,
    };

    const labelStyle: React.CSSProperties = {
        width: '100px', // 标签的固定宽度
        textAlign: 'right',
        marginRight: '8px',
    };

    const inputStyle: React.CSSProperties = {
        width: 'calc(100% - 108px)', // 减去label和margin的宽度
    };

    const getFields = () => {
        return (
            <div key='formData'>
                <Typography.Title level={3} style={{ marginBottom: '20px' }}>申请信息</Typography.Title>
                <hr style={{ marginBottom: '55px', width: '100%', borderTop: '1px solid #e8e8e8' }} />
                <Form.Item
                    name="companyName"
                    label={<span style={labelStyle}>企业名称</span>}
                    rules={[
                        {
                            required: true,
                            message: '请输入企业名称!',
                        },
                    ]}
                    style={formItemStyle}
                >
                    <Input placeholder="请输入企业名称" style={inputStyle} />
                </Form.Item>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="fieldKey"
                            label={<span style={labelStyle}>领域关键词</span>}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入领域关键词!',
                                },
                            ]}
                            style={formItemStyle}
                        >
                            <Input placeholder="请输入领域关键词" style={{ width: 'calc(100% - 108px)' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="workField"
                            label={<span style={labelStyle}>经营范围</span>}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入经营范围!',
                                },
                            ]}
                            style={formItemStyle}
                        >
                            <Input placeholder="请输入经营范围" style={{ width: 'calc(100% - 108px)' }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    name="mainBusiness"
                    label={<span style={labelStyle}>主要业务</span>}
                    rules={[
                        {
                            required: true,
                            message: '请输入主要业务!',
                        },
                    ]}
                    style={formItemStyle}
                >
                    <Input.TextArea placeholder="请输入主要业务" rows={4} style={inputStyle} />
                </Form.Item>
            </div>
        );
    };


    //这段代码用来对接前后端，只需要更改post地址即可
    const onFinish = async (values: any) => {
        try {
            onClick(values)
            // 发送表单数据给后端
            const response = await axios.post(`http://127.0.0.1:8080/api/submit-form`, values,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            console.log('Form submitted:', response.data);
            // 处理成功后的逻辑，如提示用户或重定向页面等
            onClick(values)
        } catch (error) {
            console.error('Failed to submit form:', error);
            // 处理失败后的逻辑，如提示用户或重新尝试等
        }
    };

    return (
        <div style={containerStyle}>
            <Form
                form={form}
                name="advanced_search"
                style={formStyle}
                onFinish={onFinish}
                title="申请信息" // 在这里设置表单标题
            >
                {getFields()}
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <Space size={50}>
                        <Button type="primary" htmlType='submit'>
                            Search
                        </Button>
                        <Button
                            onClick={() => {
                                form.resetFields();
                            }}
                        >
                            Clear
                        </Button>
                    </Space>
                </div>
            </Form>
        </div>
    );
};

export default Policy;
