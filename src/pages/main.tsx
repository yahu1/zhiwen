import {
    GithubFilled,
    InfoCircleFilled,
    QuestionCircleFilled,
    ArrowLeftOutlined,
} from '@ant-design/icons';
import type { ProSettings } from '@ant-design/pro-components';
import {
    PageContainer,
    ProCard,
    ProLayout,
    SettingDrawer,
} from '@ant-design/pro-components';
import { useState } from 'react';
import Props from '../router/router';
import React from 'react';
import { Route } from '../router/types';
import './css/main.css'

const Main = () => {
    const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
        layout: 'side',
    });

    const [pathname, setPathname] = useState('/welcome');

    // 递归查找路由函数
    const findRoute = (routes: Route[], path: string): Route | null => {
        for (const route of routes) {
            if (route.path === path) {
                return route;
            }
            if (route.routes) {
                const nestedRoute = findRoute(route.routes, path);
                if (nestedRoute) {
                    return nestedRoute;
                }
            }
        }
        return null;
    };

    // 渲染组件函数
    const renderComponent = (path: string): React.ReactNode => {
        const route = findRoute(Props.route.routes, path);
        if (route && route.component) {
            const Component = route.component;
            return <Component onClick={() => setPathname(`${path}/page`)} />;
        }
        return <div>页面正在开发中...</div>;
    };

    // 面包屑渲染函数
    const breadcrumbRender = (routers: any = []) => {
        return [
            {
                breadcrumbName: (
                    <span
                        key="ReturnLink"
                        onClick={() => {
                            // 处理返回链接点击事件，返回到上级页面
                            const newPathname = pathname.split('/').slice(0, -1).join('/') || '/welcome';
                            setPathname(newPathname);
                        }}
                        style={{
                            cursor: 'pointer',
                            paddingRight: 8,
                            color: '#1890ff', // 设置默认颜色
                            display: 'inline-block',
                            transition: 'background-color 0.3s',
                        }}
                        className="breadcrumb-link"
                    >
                        <ArrowLeftOutlined style={{ marginRight: 4 }} />
                        返回
                    </span>
                ),
            },
            ...routers,
        ];
    };

    return (
        <div
            id="test-pro-layout"
            style={{
                height: '100vh',
            }}
        >
            <ProLayout
                title="智文科技"
                siderWidth={256}
                bgLayoutImgList={[
                    {
                        src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
                        left: 85,
                        bottom: 100,
                        height: '303px',
                    },
                    {
                        src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
                        bottom: -68,
                        right: -45,
                        height: '303px',
                    },
                    {
                        src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
                        bottom: 0,
                        left: 0,
                        width: '331px',
                    },
                ]}
                {...Props}
                location={{
                    pathname,
                }}
                menu={{
                    type: 'group',
                }}
                avatarProps={{
                    src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
                    title: '智文',
                }}
                breadcrumbRender={breadcrumbRender}
                actionsRender={(props) => {
                    if (props.isMobile) return [];
                    return [
                        <InfoCircleFilled key="InfoCircleFilled" />,
                        <QuestionCircleFilled key="QuestionCircleFilled" />,
                        <GithubFilled key="GithubFilled" />,
                    ];
                }}
                menuItemRender={(item, dom) => (
                    <div
                        onClick={() => {
                            setPathname(item.path || '/welcome');
                        }}
                    >
                        {dom}
                    </div>
                )}
                {...settings}
            >
                <PageContainer>
                    <ProCard
                        style={{
                            height: '100vh',
                            minHeight: 800,
                        }}
                    >
                        {renderComponent(pathname)}
                        <div />
                    </ProCard>
                </PageContainer>
            </ProLayout>
            <SettingDrawer
                pathname={pathname}
                enableDarkTheme
                getContainer={() => document.getElementById('test-pro-layout')}
                settings={settings}
                onSettingChange={(changeSetting) => {
                    setSetting(changeSetting);
                }}
                disableUrlParams={false}
            />
        </div>
    );
};

export default Main;
