import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:campus_carbon/pages/adv_calculator.dart';
import 'package:campus_carbon/pages/user_data_display.dart';
import 'package:campus_carbon/decorators/button.dart';
import 'package:campus_carbon/pages/basic_calculator.dart';
import 'package:campus_carbon/pages/map.dart';
import 'package:campus_carbon/pages/add_data_page.dart';

class HomePage extends StatelessWidget {
  HomePage({super.key});

  final user = FirebaseAuth.instance.currentUser!;
  final textToSentController = TextEditingController();
  void signOut() {
    FirebaseAuth.instance.signOut();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.grey[300],
        appBar: AppBar(
          backgroundColor: Colors.transparent,
          actions: [
            IconButton(onPressed: signOut, icon: const Icon(Icons.logout)),
          ],
        ),
        body: Center(
          child: SingleChildScrollView(
            child: SafeArea(
              child: Center(
                child: Column(
                  children: [
                    const SizedBox(
                      height: 30,
                    ),
                    Center(
                      child: Padding(
                        padding: const EdgeInsets.all(20.0),
                        child: FittedBox(
                          child: Row(
                            children: [
                              Text(
                                "Welcome, ",
                                style: TextStyle(
                                  color: Colors.grey[600],
                                  fontSize: 25,
                                ),
                              ),
                              Text(
                                " ${user.displayName ?? 'User'}".toUpperCase(),
                                style: TextStyle(
                                  color: Colors.green[700],
                                  fontSize: 25,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(
                      height: 30,
                    ),

                    MyButton(
                        onTap: () {
                          Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) => AdvCalculator(
                                      email: user.email ?? "NA")));
                        },
                        strValue: "Advanced Calculator"),
                    // ElevatedButton(
                    //   child: const Text("Advanced Calculator"),
                    //   onPressed: () {
                    //     Navigator.push(
                    //         context,
                    //         MaterialPageRoute(
                    //             builder: (context) =>
                    //                 AdvCalculator(email: user.email ?? "NA")));
                    //   },
                    // ),

                    const SizedBox(
                      height: 20,
                    ),

                    MyButton(
                        onTap: () {
                          Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) =>
                                      const BasicCalculator()));
                        },
                        strValue: "Basic Calculator"),
                    // ElevatedButton(
                    //   child: const Text("Basic Calculator"),
                    //   onPressed: () {
                    //     Navigator.push(
                    //         context,
                    //         MaterialPageRoute(
                    //             builder: (context) => const BasicCalculator()));
                    //   },
                    // ),

                    const SizedBox(
                      height: 20,
                    ),

                    MyButton(
                        onTap: () {
                          Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) =>
                                      UserData(email: user.email ?? "NA")));
                        },
                        strValue: "Get Data"),

                    const SizedBox(
                      height: 20,
                    ),

                    MyButton(
                        onTap: () {
                          Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) => const CollegeMap()));
                        },
                        strValue: "College Map"),

                    const SizedBox(
                      height: 20,
                    ),

                    MyButton(
                        onTap:() => _addDataPage(user, context),
                        strValue: "Add Data"),

                    const SizedBox(
                      height: 100,
                    ),
                  ],
                ),
              ),
            ),
          ),
        ));
  }

  _addDataPage(user, BuildContext context) {
    if (user.email! == "a@eg.com") {
      Navigator.push(
          context,
          MaterialPageRoute(
              builder: (context) => const AddDataPage()
          )
      );
    }
    else{
      _showResultDialog("Need Admin Privileges", context);


    }
  }

  void _showResultDialog(String totalEmissions, BuildContext context) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text("Status"),
          content: Text(totalEmissions),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text("Ok"),
            ),
          ],
        );
      },
    );
  }
}
