import { H2, P } from "../styles/global.styled";
import {StyledVideo, StyledSection, StyledSpan} from "./Home.styled";
import video from "../assets/videos/video.mp4";
import { RegisterForm } from "../components/RegisterForm";
import { Colors } from "../styles/colors";

export const HomePage = () => {
 

  return (
    <>
      <StyledSection id="video">
        <StyledVideo src={video} autoPlay loop muted></StyledVideo>
      </StyledSection>
      <StyledSpan>Ett professionellt verktyg för dietister, kostrådgivare och personliga tränare.</StyledSpan>
      <StyledSection $padding="0px 50px" $backgroundColor={Colors.Green200} id="about">
        <H2 style={{color: `${Colors.Green600}`}}>About</H2>
        <P style={{color: `${Colors.Green600}`}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa, sunt assumenda repudiandae dolorem odit nesciunt impedit. Veritatis saepe corporis inventore voluptate provident magni, quidem dolor, accusamus earum obcaecati voluptates debitis.
        Assumenda, officia quisquam! Enim alias esse autem mollitia maxime neque aut officia porro incidunt atque vitae, cum provident veritatis at. Eveniet accusantium iste commodi voluptates sunt aperiam? Nihil, maxime vero.
        Magni autem provident molestias inventore rerum id asperiores tempora neque quibusdam voluptates? Quos optio adipisci officiis veniam voluptates expedita quaerat fuga placeat eum, voluptatibus eaque quasi, dolor temporibus delectus pariatur!
        Eligendi, expedita recusandae amet dolores optio consectetur veniam neque mollitia adipisci suscipit excepturi inventore non! Quaerat, libero et voluptate, molestiae cum voluptatem a tenetur pariatur temporibus accusamus consectetur, adipisci architecto?
        Sequi, quas officiis nam quisquam tempora quod ipsum dicta similique suscipit. Itaque iusto officia accusantium minima possimus quaerat id. Impedit doloribus sit debitis necessitatibus adipisci cupiditate nobis iste rerum quibusdam?
        Placeat doloremque accusantium dicta provident illo ex aliquam, voluptate impedit harum, pariatur quasi, ut laudantium! Tempora placeat a non doloremque eaque in nesciunt mollitia molestias, voluptate ut, doloribus nihil rerum!
        A labore deserunt alias? Facilis placeat debitis harum beatae aliquid fugit, cupiditate minus exercitationem praesentium quis, illum maxime iste aspernatur at temporibus nulla? Commodi ullam ab quis dolor dicta doloremque!
        Molestias ut commodi, voluptatibus a nisi laboriosam aut saepe et magni temporibus, repellat similique assumenda, omnis minima. Fuga molestiae est omnis facere blanditiis quaerat, eum perferendis. Voluptatum saepe culpa aliquam!
        Accusantium impedit necessitatibus ipsa natus voluptate, libero distinctio nostrum nemo unde ad quaerat minima blanditiis aliquid qui, similique, soluta praesentium illum totam ab placeat eius magni eveniet. Tempore, veritatis deleniti.
        Doloribus modi odit quos aliquam, fuga sit error ducimus beatae. Ea cum ut, dolore eius cupiditate quasi sequi quia ipsa quis, iure adipisci fuga quae, magni non corrupti cumque quas!
        </P>
      </StyledSection>
      <StyledSection $padding="0px 50px" $backgroundColor={Colors.Gold50} id="how-it-works">
        <H2 style={{color: `${Colors.Green600}`}}>How it works</H2>
        <P>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius qui hic, perferendis magni, quibusdam a error asperiores dicta consequuntur temporibus ut suscipit officiis vero! Ullam iste animi asperiores eveniet architecto!
        Odio quam cupiditate, laudantium nostrum error obcaecati quaerat asperiores modi autem minus? Perspiciatis ab aliquid nemo. Eveniet commodi explicabo veniam in! Quam doloremque in perspiciatis numquam alias aperiam laborum mollitia.
        Rem, ea autem officiis distinctio earum nemo velit perspiciatis at delectus nesciunt, sequi nisi sunt ratione error. Nobis ipsum numquam accusantium libero, laborum, doloribus officiis illum praesentium, iste nemo magnam?
        Temporibus cumque, et officia vitae natus repudiandae perspiciatis dolorem blanditiis, veniam adipisci saepe explicabo ratione fuga sequi ducimus voluptatibus asperiores rerum esse porro ea beatae corrupti animi voluptatum. Dolore, ut?
        Dolorum, adipisci? Laborum eum exercitationem sapiente unde ducimus expedita aut saepe. Officiis molestias fugiat eius nostrum exercitationem quasi vel natus quaerat sunt sequi enim numquam voluptate illo, porro voluptas maiores!</P>
      </StyledSection>
      <StyledSection $padding="0px 50px" $backgroundColor={Colors.Green200} $justifyContent="center" id="register">
      <RegisterForm />
      </StyledSection>
      <StyledSection $padding="0px 50px"  $backgroundColor={Colors.Gold50} id="contact">
        <H2 style={{color: `${Colors.Green600}`}}>Contact</H2>
        <P>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium corrupti maxime dolorem. Magnam, atque ipsa ab facere, iusto repellendus reprehenderit repudiandae, odio consequatur error aliquam. Omnis sit asperiores doloremque officia.
        Deserunt itaque sit eaque assumenda, adipisci consequatur aliquam ad rem tenetur saepe, cum molestiae earum quod nam natus laborum asperiores! Accusamus voluptate placeat amet voluptatum, iusto error iure temporibus corporis.
        Modi aspernatur saepe error vitae illo neque cum ab facere blanditiis, magni, doloremque iure! Maxime dolor natus aperiam reiciendis dolores magni delectus perferendis iusto iure! Numquam exercitationem alias velit minus!
        Possimus unde animi omnis! Provident suscipit veniam neque, aspernatur dolorem quam sint doloribus odit, incidunt, sequi voluptatem aliquid dicta totam porro! Debitis, eligendi non nesciunt vitae amet soluta eius iste.
        Quaerat quidem, blanditiis, eius officiis odit mollitia similique, exercitationem accusamus eveniet dignissimos hic eaque? Delectus est nesciunt ipsum quo, necessitatibus laboriosam mollitia? Ipsa voluptatum doloribus nisi odit alias. Magnam, explicabo!</P>
      </StyledSection>
    </>
  );
};


