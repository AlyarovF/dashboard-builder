import { SearchOutlined } from "@ant-design/icons";
import { faBell, faComments } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Badge, Flex, Input, Popover, Space } from "antd";
import { StyledHeader } from "./Header.styles";

const Header = () => {
  return (
    <StyledHeader>
      <div className="fido-container">
        <img src="./fido-biznes.png" alt="fido-biznes" width={150} />
      </div>
      <Flex justify="space-between" align="center" className="header">
        <Space size="middle">
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          />
        </Space>
        <Flex gap={30} align="center">
          <Badge dot={true} size="small">
            <FontAwesomeIcon
              icon={faBell}
              style={{ color: "rgba(0,0,0,0.25)", cursor: "pointer" }}
              size="xl"
            />
          </Badge>
          <FontAwesomeIcon
            icon={faComments}
            style={{ color: "rgba(0,0,0,0.25)", cursor: "pointer" }}
            size="xl"
          />
          <Popover
            placement="bottomLeft"
            content={
              <>
                <p>Alyarov Faxriyor</p>
                <p>+998996952085</p>
                <a href="https://t.me/alyarovf">t.me/alyarovf</a>
              </>
            }
            arrow={undefined}
            trigger="click"
          >
            <Avatar
              style={{ cursor: "pointer" }}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv2X0sN17jO4yNiNPuPIUOEvh_OSUT_WjBjg&s"
            />
          </Popover>
        </Flex>
      </Flex>
    </StyledHeader>
  );
};

export default Header;
