import 'package:animated_splash_screen/animated_splash_screen.dart';
import 'package:campus_carbon/pages/auth.dart';
import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';

class SplashScreen extends StatelessWidget {
  const SplashScreen({super.key});

  @override
  Widget build(BuildContext context) {

    return Center(
      child: AnimatedSplashScreen(
        duration: 6900,
        backgroundColor: const Color(0xFFFFFFFF),
        splash: Center(
          child: LottieBuilder.asset("lib/assets/finalsplash.json", height: MediaQuery.of(context).size.height,width: MediaQuery.of(context).size.width,
            fit: BoxFit.fitWidth,),
        ),
        nextScreen: const Auth(),
        splashIconSize: 1000,

      ),

    );
  }
}


