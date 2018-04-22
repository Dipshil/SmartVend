import cv2
import zbar
from picamera import PiCamera
from picamera.array import PiRGBArray
import time
from PIL import Image
import requests
import ast


class e(Exception):
	pass

API_ENDPOINT = "http://172.26.135.37:3000/api/load"

data = {}

camera = PiCamera()
camera.resolution = (320,240)
camera.framerate = 32
rawCapture = PiRGBArray(camera, size=(320,240))

scanner = zbar.ImageScanner()
scanner.parse_config('enable')

time.sleep(1)

for frame in camera.capture_continuous(rawCapture, format="bgr",use_video_port=True):
	image = frame.array
	gray = cv2.cvtColor(image,cv2.COLOR_BGR2GRAY,dstCn=0)
	rawCapture.truncate(0)
	pil = Image.fromarray(gray)
	w,h = pil.size
	cv2.imshow("Frames",gray)
	image = zbar.Image(w,h,'Y800',pil.tobytes())
	scanner.scan(image)
	out =[(s.type, s.data) for s in image]
	if out == []:
		continue
	else:
		try:
			data = ast.literal_eval(out[0][1])
			data['machine_id'] = 1
			r = requests.post(url=API_ENDPOINT, data = data)
			print('sent')
		except e:
			print('error')
	key=cv2.waitKey(1) & 0xFF
	if key == ord("q"):
		break
