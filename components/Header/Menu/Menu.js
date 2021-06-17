import React, { useState, useEffect } from "react";
import { Container, Menu, Grid, Icon, Label, Button } from "semantic-ui-react";
import Link from "next/link";
import BasicModal from "../../Modal/BasicModal";
import Auth from "../../Auth";
import useAuth from "../../../hooks/useAuth";
import { getMeApi } from "../../../api/user";

export default function MenuWeb() {

  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("Inicia sesión");
  const [user, setUser] = useState(undefined);
  const { auth, logout } = useAuth();


  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);
      setUser(response);
    })();
  }, [auth]);



  const onShowModal = () => setShowModal(true);
  const onCloseModal = () => setShowModal(false);
  
    return (
        <div className="menu">
          <Container>
            <Grid>
              <Grid.Column className="menu__left" width={6}>
              <MenuPlatforms/>
              </Grid.Column>
              <Grid.Column className="menu__right" width={10}>
              {user !== undefined && (
              <MenuOptions
                onShowModal={onShowModal}
                user={user}
                logout={logout}
              />
            )}
              </Grid.Column>
            </Grid>

          </Container>
          <BasicModal
          show={showModal}
        setShow={setShowModal}
        title={titleModal}
        size="small">
            
            <Auth onCloseModal={onCloseModal} setTitleModal={setTitleModal}  />
          </BasicModal>
          
        </div>
      );
}

function MenuPlatforms() {
   
  
    return (
      <Menu>
        
          <Link href="/play-station">
          <Menu.Item >
             Playstation
             </Menu.Item>
          </Link>
          <Link href="/xbox">
          <Menu.Item >
             xbox
             </Menu.Item>
          </Link>
          <Link href="/switc">
          <Menu.Item >
          switc
             </Menu.Item>
          </Link>
       
      </Menu>
    );
  }


  function MenuOptions(props) {
    const { onShowModal, user, logout } = props;
   
    return (
        <Menu>
             {user ? (
        <>
          
            <Menu.Item as="a">
              <Icon name="game" />
              Mis pedidos
            </Menu.Item>
       
          <Menu.Item className="m-0" onClick={logout}>
            <Icon name="power off" />
          </Menu.Item>
        </>
      ) : (
        <Menu.Item onClick={onShowModal}>
          <Icon name="user outline" />
          Mi cuenta
        </Menu.Item>
      )}
            

        </Menu>
       
     
    );
  }
  
