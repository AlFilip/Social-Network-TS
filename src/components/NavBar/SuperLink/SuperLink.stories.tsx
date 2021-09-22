// import React from 'react';
// import {Meta, Story} from '@storybook/react';
//
// import {LinkType, SuperLink} from './SuperLink';
// import {BrowserRouter} from "react-router-dom";
//
// export default {
//     title: 'SuperLink',
//     component: SuperLink,
// } as Meta
//
// const Template: Story<LinkType> = (args) => <BrowserRouter> <SuperLink {...args} /></BrowserRouter>;
//
// export const SimpleExample = Template.bind({});
// SimpleExample.args = {
//     to: 'Profile',
//     linkName: 'LinkName'
// };
//
// const Template2: Story<LinkType> = (args) => <BrowserRouter>
//     <SuperLink {...args} />
//     <SuperLink {...args} />
//     <SuperLink {...args} />
// </BrowserRouter>;
//
// export const ListOfSuperLinks = Template2.bind({});
// ListOfSuperLinks.args = {
//     to: 'Profile',
//     linkName: 'Link Item'
// };