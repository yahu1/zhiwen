import React, { useEffect, useState } from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, theme } from 'antd';
import ReactMarkdown from 'react-markdown';
import type { CSSProperties } from 'react';
import type { CollapseProps } from 'antd';

const predefinedPanels = [
    { key: '1', label: '如何申请' },
    { key: '2', label: '政策利好' },
    { key: '3', label: '截止日期' },
];

interface PanelData {
    key: string;
    content: string;
}

//从后端接口获取数据
const fetchPanelData = async (): Promise<PanelData[]> => {
    const response = await fetch('http://127.0.0.1:8080/api/panelData');
    const data = await response.json();
    return data;
};

const getItems = (predefinedPanels: { key: string; label: string }[], panelData: PanelData[], panelStyle: CSSProperties): CollapseProps['items'] => {
    return predefinedPanels.map((panel) => {
        const data = panelData.find((item) => item.key === panel.key);
        return {
            key: panel.key,
            label: panel.label,
            children: <ReactMarkdown>{data ? data.content : '内容加载中...'}</ReactMarkdown>,
            style: panelStyle,
        };
    });
};

const SearchPage: React.FC = () => {
    const { token } = theme.useToken();
    const [panelData, setPanelData] = useState<PanelData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchPanelData();
                setPanelData(data);
            } catch (error) {
                console.error('Failed to fetch panel data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const panelStyle: React.CSSProperties = {
        marginBottom: 24,
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: 'none',
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Collapse
            bordered={false}
            defaultActiveKey={predefinedPanels.map((item) => item.key)}
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            style={{ background: token.colorBgContainer }}
            items={getItems(predefinedPanels, panelData, panelStyle)}
        />
    );
};

export default SearchPage;
