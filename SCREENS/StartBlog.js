import { useState } from "react";
import {
  IconButtonTwo,
  RoundedCorners,
  SafeArea,
  Spacer,
  bus,
  colors,
  format,
  height,
  layout,
  sizes,
} from "../EVERYTHING/BAGEL/Things";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MenuBar } from "../EVERYTHING/MenuBar";

export function StartBlog({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [chosenBlogPost, setChosenBlogPost] = useState({});
  //
  const blogs = [
    {
      id: 0,
      Title:
        "Indulge in the Flavors of Spring and Summer with Cafeina Cafe's New Drinks!",
      Date: "April 30, 2023",
      Desc: "We are thrilled to introduce our latest menu offerings, which include some exciting new drinks that are perfect for the spring and summer season. We are confident that you will love our new drinks as much as we do. So, without further ado, let us dive into the flavors of our new drinks.",
      Author: "Andrew Benavides",
      Image: require("../assets/IMAGES/jamaica.jpg"),
    },
  ];
  return (
    <SafeArea
      loading={loading}
      statusBar={"light"}
      styles={[{ backgroundColor: "#000000" }]}
    >
      <View style={[{ flex: 1 }]}>
        <View
          style={[layout.padding, layout.horizontal, { alignItems: "center" }]}
        >
          <IconButtonTwo
            name="arrow-back-outline"
            size={30}
            color="white"
            onPress={() => {
              navigation.navigate("start-menu");
            }}
          />
          <Text style={[colors.white, sizes.medium_text]}>Our Blog</Text>
        </View>
        <RoundedCorners
          topLeft={15}
          topRight={15}
          styles={[
            {
              backgroundColor: "#F2F3F7",
              borderBottomWidth: 1,
              borderBottomColor: "rgba(0,0,0,0.2)",
            },
            layout.padding,
          ]}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              {blogs.map((post, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    style={[layout.padding_vertical]}
                    onPress={() => {
                      setChosenBlogPost(post);
                      setShowPost(true);
                    }}
                  >
                    <Image
                      source={post.Image}
                      style={[
                        { width: "auto", height: height * 0.5 },
                        format.radius,
                      ]}
                    />
                    <Spacer height={10} />
                    <Text style={[sizes.large_text]}>{post.Title}</Text>

                    <Text style={[{ color: "#8F8F8F" }]}>By {post.Author}</Text>
                    <Text
                      style={[layout.padding_vertical_small, sizes.small_text]}
                    >
                      {post.Desc}
                    </Text>
                    <Text style={[{ color: "#8F8F8F" }, format.right_text]}>
                      {post.Date}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </RoundedCorners>

        <Modal visible={showPost} animationType="slide">
          <SafeArea>
            <View style={[layout.padding]}>
              {chosenBlogPost.id === 0 && (
                <View>
                  <View
                    style={[
                      layout.separate_horizontal,
                      { alignItems: "center" },
                    ]}
                  >
                    <IconButtonTwo
                      name="arrow-back-outline"
                      size={30}
                      onPress={() => {
                        setShowPost(false);
                      }}
                    />
                    <Text>By {chosenBlogPost.Author}</Text>
                  </View>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={[layout.margin_vertical]}
                  >
                    <View style={[layout.margin_vertical, layout.vertical]}>
                      <Image
                        source={chosenBlogPost.Image}
                        style={[
                          { width: "auto", height: height * 0.5 },
                          format.radius,
                        ]}
                      />
                      <Text style={[sizes.large_text]}>
                        {chosenBlogPost.Title}
                      </Text>
                    </View>
                    {/* BLOG POST CONTENT */}
                    <View>
                      <Text style={[sizes.small_text, layout.padding_vertical]}>
                        {chosenBlogPost.Desc}
                      </Text>
                    </View>
                    <View>
                      <Text style={[sizes.small_text, layout.padding_vertical]}>
                        We are thrilled to introduce our latest menu offerings,
                        which include some exciting new drinks that are perfect
                        for the spring and summer season. We are confident that
                        you will love our new drinks as much as we do. So,
                        without further ado, let us dive into the flavors of our
                        new drinks.
                      </Text>
                      <View>
                        <Image
                          source={require("../assets/IMAGES/blog1img1.jpg")}
                          style={[
                            layout.image_cover,
                            { width: "100%", height: height * 0.5 },
                          ]}
                        />
                      </View>
                      <Text style={[sizes.small_text, layout.padding_vertical]}>
                        First up, we have the Honey Rose Latte. This latte has a
                        beautiful, delicate floral flavor with just the right
                        amount of sweetness. The rose flavor is subtle and
                        perfectly balanced with the honey, giving it a delicious
                        and aromatic taste. The Honey Rose Latte is perfect for
                        those who love floral and sweet flavors.
                      </Text>
                      <Text style={[sizes.small_text, layout.padding_vertical]}>
                        Next, we have the Honey Lavender Latte. This latte has a
                        calming and soothing lavender flavor that is
                        complemented by the sweetness of the honey. The flavors
                        are perfectly balanced, making it a great drink for
                        those who enjoy a unique and comforting taste.
                      </Text>
                      <View>
                        <Image
                          source={require("../assets/IMAGES/jamaica.jpg")}
                          style={[
                            layout.image_cover,
                            { width: "100%", height: height * 0.5 },
                          ]}
                        />
                      </View>
                      <Text style={[sizes.small_text, layout.padding_vertical]}>
                        For those who love a refreshing and tangy drink, we have
                        the Jamaica Lemon Lime Refresher. This drink has a zesty
                        and citrusy flavor, with just the right amount of
                        sweetness. It is the perfect drink for a hot summer day,
                        providing a burst of energy and refreshment.
                      </Text>
                      <View>
                        <Image
                          source={require("../assets/IMAGES/blog1img2.jpg")}
                          style={[
                            layout.image_cover,
                            { width: "100%", height: height * 0.5 },
                          ]}
                        />
                      </View>
                      <Text style={[sizes.small_text, layout.padding_vertical]}>
                        Our Matcha Rose drink is a unique and delightful blend
                        of matcha and rose flavors. The matcha provides a rich,
                        earthy flavor that is perfectly balanced by the delicate
                        floral notes of the rose. The sweetness of the honey
                        complements the flavors, making it a great drink for
                        those who love a subtle and sophisticated taste.
                      </Text>
                      <Text style={[sizes.small_text, layout.padding_vertical]}>
                        Our new drinks are the perfect addition to our menu, and
                        we are confident that you will love them. Whether you
                        prefer floral and sweet flavors, tangy and refreshing
                        drinks, or sophisticated blends, we have something for
                        everyone. Come to Cafeina Cafe and indulge in our new
                        drinks, and experience the perfect balance of flavor and
                        taste!
                      </Text>
                    </View>
                    <Spacer height={40} />
                  </ScrollView>
                </View>
              )}
            </View>
          </SafeArea>
        </Modal>
      </View>
    </SafeArea>
  );
}
