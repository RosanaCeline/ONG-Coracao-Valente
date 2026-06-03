const Title = ({ as: Tag = 'h2', children, className, ...props }) => (
  <Tag className={className} {...props}>
    {children}
  </Tag>
);

export default Title;
